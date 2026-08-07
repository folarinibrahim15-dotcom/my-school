import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

content:[
"./index.html",
"./src/**/*.{js,jsx}"
],

theme:{

extend:{

colors:{

schoolBlue:"#2563EB",

footerBlue:"#1E3A8A",

schoolYellow:"#FACC15",

schoolRed:"#991B1B"

},

fontFamily:{

montserrat:[
"Montserrat",
"sans-serif"
],

poppins:[
"Poppins",
"sans-serif"
],

openSans:[
"Open Sans",
"sans-serif"
]

}

}

},
  plugins: [
    tailwindcss(),
  ],
})

// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })
