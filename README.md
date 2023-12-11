# Coplanner

Coplanner is the official repository of the CollaboraPlan application.
The project has been developed using VueJS 3 and Firebase on the VSCode IDE.

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## What is CollaboraPlan

This is a platform that enables synchronous planning in academic and professional settings.

## How To Use The App

The applications offers two main views namely:

* Authentication: This view hosts the login and registration subviews as highlighted below.

![Login Page](docs/res/demo-login.png)

![Register Page](docs/res/demo-register.png)

* Dashboard: This view host an admin and standard view which is based on the role assigned to the user. The admin role allows for performing CRUD operations. The standard mode purely serves as a consumer of the saved data.

![Default Dashboard View](docs/res/demo-dash-default.png)

![Default Dashboard View in Taskview](docs/res/demo-dash-default-taskview.png)

![Grouped by Type Dashboard View](docs/res/demo-dash-type-taskview.png)

Optionally, the application offers an About page.

## Contributing

The application is licenced under the MIT licence. 
Feel free to contribute and ake use of the resources provided accordingly.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Compile and Minify for Production

```sh
npm run build
```
