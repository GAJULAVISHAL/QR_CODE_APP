# QR Pass Generator

## Project Overview
This is a React-based QR Pass Generator application that allows users to create downloadable passes with embedded user IDs and scannable QR codes.

## Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- Cloudflare account
- Git

## Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/qr-pass-generator.git
cd QR_CODE_APP
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd QR_FRONTEND

# Install dependencies
npm install

# Create environment variables file
touch .env
```

#### Environment Variables
Add the following to your `.env` file:
```
VITE_BACKEND_URL = ""
```
## Run Frontend
```
npm run dev
```

### 3. Backend (Cloudflare Workers) Setup
```bash
# Navigate to backend directory
cd ../QR_BACKEND

# Install Cloudflare Workers CLI
npm install 

#Add Environment Variables
Create a `.env` file in the backend 
```
DATABASE_URL = "a postgres db url"
```
```

### 4. Configure Cloudflare Worker
Create a `wrangler.toml` file in the backend directory:
```toml

[vars]
DATABASE_URL = "Prisma acclerate url from prisma data platform"
```
### 5.Migrate your database
```bash
#In the backend directory
npx prisma migrate dev --name "inti"

#Generate Prisma Client
npx prisma generate --no-engine
```

### 6. Running the Application

#### Start Frontend
```bash
# In the frontend directory
npm run dev
```

#### Deploy Backend to Cloudflare
```bash
# In the backend directory
npm run deploy
```

## Features
- Generate QR passes with embedded user ID
- Downloadable pass functionality
- User ID and pass input
- Database storage of generated passes
- User pass management

## Additional Feature
- Create events 
- Store the events in the database

## Technologies Used
- React.js (Frontend)
- Cloudflare Workers (Backend)
- QR Code Generation Library
- Database (as specified in your implementation)

## Troubleshooting
- Ensure all environment variables are correctly set
- Check Cloudflare Worker deployment logs
- Verify database connection

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Contact
Your Name - vishalgajula0709@gmail.com
Project Link: [https://github.com/GAJULAVISHAL/QR_CODE_APP](https://github.com/GAJULAVISHAL/QR_CODE_APP)
Live Link : [QR APP](https://qr-app-silk.vercel.app/)
```