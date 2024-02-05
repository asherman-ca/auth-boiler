Core Dependencies:
Auth - Authjs (https://authjs.dev/)
Server Framework - Next
Client component library - React
Styling library - Tailwind
FE Elements - shadcn/ui
DB - Neon

Project Email: asherman.ca@yahoo.com

Prisma Guide:
npx prisma init
npx prisma generate (preps dev environment with client and types)
npx prisma db push (pushes schema to cloud db)
npx prisma studio (launches preview in browser tab)
npx prisma migrate reset (resets entire database)

Notes:
Secret generation: `openssl rand -hex 32`
