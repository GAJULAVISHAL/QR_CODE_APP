import { z } from 'zod';
import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { hashSync, compare } from "bcryptjs"
import QRCode from 'qrcode-generator';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono();
app.use(cors())
const prisma = new PrismaClient()

const GenerateQRCode = (qrData: string, cellSize: number) => {
  const qr = QRCode(0, 'L');
  qr.addData(qrData);
  qr.make();
  return qr.createDataURL(cellSize);
}

// Updated Zod schema for the input data
const passInputSchema = z.object({
  userId: z.number(),
  personName: z.string(),
  age: z.string(),
  eventName: z.string(),
  price: z.number(),
  eventDate: z.string(),
  bookingDate: z.string(),
});

const SignupInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  userId: z.string()
})

const LoginInputSchema = z.object({
  email : z.string().email(),
  password : z.string()
})

const EventDetailsSchema = z.object({
  name : z.string(),
  price : z.number(),
  date : z.string()
})

app.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try {

    const { email, password, userId } = await c.req.json()
    if (!email || !password || !userId) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    const validate = SignupInputSchema.safeParse({ email, password, userId })
    if (!validate) {
      return c.json({
        msg: "invalid input type"
      })
    }
    const exsistingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (exsistingUser) {
      return c.json({
        msg: "email already exisits"
      })
    }
    const hashedPassword = hashSync(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userId: userId
      },
    })
    return c.json({ newUser }, 201)
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'failed to create user' })
  }
})

app.post('/login', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try {
    const LoginInput = await c.req.json()
    const InputValidate = LoginInputSchema.safeParse(LoginInput)
    if(!InputValidate){
      return(
        c.json({
          msg : "Wrong Input formate"
        })
      )
    }
    const user = await prisma.user.findUnique({
      where: {
        email: LoginInput.email
      }
    })
    if (!user) {
      return (c.json({
        msg: "Invalid Mail"
      }, 401))
    }
    const validatePassword = compare(LoginInput.password, user.password)
    if (!validatePassword) {
      return (
        c.json({
          msg: "Wrong Password"
        }, 401)
      )
    }
    return (
      c.json({
        user
      })
    )
  }catch(error){

  }
})

app.post('/generate-pass', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try {
    const InputPayload = await c.req.json();
    const validate = passInputSchema.parse(InputPayload);

    if (!validate) {
      return c.json({
        error: 'Invalid input data'
      })
    }
    const qrCodeUrl = GenerateQRCode(JSON.stringify(InputPayload.userId), 12);

    const pass = await prisma.pass.create({
      data: {
        userId: validate.userId,
        personName: validate.personName,
        age: validate.age,
        eventName: validate.eventName,
        price: validate.price,
        eventDate: validate.eventDate,
        bookingDate: validate.bookingDate,
        qrCodeUrl
      },
    });

    return c.json({
      pass
    })
  } catch (error) {
    return c.json({
      error: error instanceof Error ? error.message : 'Could not generate pass'
    })
  }
});

// GET endpoint to fetch passes for a given user
app.get('/passes/:userId', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try {
    const { userId } = c.req.param();
    const userPasses = await prisma.pass.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        personName: true,
        eventName: true,
        price: true,
        eventDate: true,
        qrCodeUrl: true
      }
    });

    return c.json({ passes: userPasses });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'Could not fetch passes' }, 400);
  }
});

app.get('/pass/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try {

    const { id } = c.req.param()
    const pass = await prisma.pass.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        personName: true,
        eventName: true,
        eventDate: true,
        price: true,
        qrCodeUrl: true,
      }
    })
    return c.json({
      pass
    })
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'Could not fetch passes' }, 400);
  }
})

app.post("/addevent",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const eventdetails = await c.req.json()
    const validate = EventDetailsSchema.safeParse(eventdetails)
    if(!validate){
      return(
        c.json({
          msg : "invalid inputs"
        })
      )
    }
    const event = await prisma.event.create({
      data:{
        name : eventdetails.name,
        price : parseFloat(eventdetails.price),
        date : eventdetails.date
      }
    })
    return(
      c.json({event})
    )
  }catch(error){
    return c.json({ error: error instanceof Error ? error.message : 'Could not fetch passes' }, 400);
  }
})

app.get("/events",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  const events = await prisma.event.findMany({
    select:{
      name:true,
      price:true,
      date:true
    }
  })
  return c.json({events})
})
export default app;
