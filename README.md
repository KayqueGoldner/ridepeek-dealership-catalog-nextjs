# RidePeek Dealership Catalog

**RidePeek is a modern platform for showcasing, searching, and filtering vehicles (cars and motorcycles) and dealership products. It allows users to explore vehicles by manufacturer, year, price, and more — plus browse related products with ease.**

![Application Screenshot](/ridepeek-dealership-catalog.png "Application Screenshot")
![Application Screenshot](/ridepeek-dealership-catalog-dashboard.png "Application Screenshot")

## 🚀 Features  

- **Vehicle Listing and Search**: Browse cars and motorcycles with ease
- **Advanced Filters**: Filter by manufacturer, year, price, and other attributes
- **Detailed Vehicle and Product Pages**: Rich information with images and specifications
- **Automotive Product Catalog**: Showcase of dealership products and accessories
- **Manufacturer System**: Includes logo and country of origin for each brand
- **Dynamic Hero/Banner**: Easily customizable homepage banners
- **Modern and Responsive UI**: Seamless experience across all device sizes
- **PayloadCMS Integration**: Manage content dynamically via a headless CMS
- **Storybook Integration**: UI component documentation and testing environment


## 🛠️ Technologies Used 

- **Frontend:**
  - [Next.js 15](https://nextjs.org/)
  - [React 19](https://react.dev/)
- **Backend:**
  - [PayloadCMS](https://payloadcms.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [tRPC](https://trpc.io/)
- **Styling**:  
  - [TailwindCSS](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
- **Programming Language**:  
  - [TypeScript](https://www.typescriptlang.org/)
- **NPM Packages:**
  - [Lucide React](https://lucide.dev/)
  - [Storybook](https://storybook.js.org/)
  - [Zod](https://zod.dev/)
  - [React Hook Form](https://react-hook-form.com/) 
  - [Embla Carousel](https://www.embla-carousel.com/)
  - [date-fns](https://date-fns.org/)

## 📦 Structure

- `src/collections/` — Payload collections definitions: Cars, Motorcycles, Products, Manufacturers, Users, Media, Hero
- `src/modules/` — Logic and UI for cars, motorcycles, manufacturers, home, shop, and hero
- `src/components/` — Reusable UI components
- `src/app/` — Next.js routes and pages
- `src/trpc/` — tRPC configuration and routes
- `src/payload.config.ts` — PayloadCMS configuration

## 💻 Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/KayqueGoldner/ridepeek-dealership-catalog-nextjs
cd ridepeek-dealership-catalog-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file with the following variables:

```env
# Added by Payload
DATABASE_URI=
PAYLOAD_SECRET=

# UPLOADTHING
UPLOADTHING_TOKEN=
```

### 4. **Generate Payload types (optional):**

```pwsh
npm run generate:types
```


### 5. **Run the Application**

```pwsh
npm run dev
```

The app will be available at `http://localhost:3000`

### 6. **Access the Payload admin panel:**

The admin is available at `/admin`.

### 7. **Storybook:**

To preview and document UI components in isolation:

```pwsh
npm run storybook
```

The preview will be available at `http://localhost:6006`

## 🤝 Contribute

1. Fork this repository
2. Create a branch for your changes (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

All contributions are welcome!