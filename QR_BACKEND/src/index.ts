import { z } from 'zod';
import { cors } from 'hono/cors';
import { Hono } from 'hono';
import QRCode from 'qrcode-generator';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono();
app.use(cors())
const prisma = new PrismaClient()

const GenerateQRCode = (qrData: string , cellSize: number) => {
  const qr = QRCode(0, 'L');
  qr.addData(qrData);
  qr.make();
  return qr.createDataURL(cellSize);
}

// Updated Zod schema for the input data
const passInputSchema = z.object({
  userId: z.string(),
  personName: z.string(),
  age: z.string(),
  eventName: z.string(),
  price: z.number(),
  eventDate: z.string(),
  bookingDate: z.string(),
});


app.post('/generate-pass', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: (c.env as { DATABASE_URL: string }).DATABASE_URL
  }).$extends(withAccelerate())
  try {
    const InputPayload = await c.req.json();
    const validate  = passInputSchema.parse(InputPayload);

    if(!validate) {
      return c.json({
        error: 'Invalid input data'
      })
    }
    const qrCodeUrl = GenerateQRCode(JSON.stringify(InputPayload.userId),12);

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
  }catch(error){
    return c.json({
      error : error instanceof Error ? error.message : 'Could not generate pass'
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
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select:{
        id : true,
        personName : true,
        eventName : true,
        price : true,
        eventDate : true,
        qrCodeUrl : true
      }
    });

    return c.json({ passes: userPasses });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : 'Could not fetch passes' }, 400);
  }
});

export default app;
