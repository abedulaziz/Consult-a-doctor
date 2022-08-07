<img src="./readme/title1.svg"/>

<div align="center">

> Consult a doctor is a platform where the distance between patients and doctors is very close and the communication in seamless.

**[PROJECT PHILOSOPHY](https://github.com/abedulaziz/Consult-a-doctor#-project-philosophy) • [WIREFRAMES](https://github.com/abedulaziz/Consult-a-doctor#-wireframes) • [TECH STACK](https://github.com/abedulaziz/Consult-a-doctor#-tech-stack) • [IMPLEMENTATION](https://github.com/abedulaziz/Consult-a-doctor#-impplementation) • [HOW TO RUN?](https://github.com/abedulaziz/Consult-a-doctor#-how-to-run)**

</div>

<br><br>


<img src="./readme/title2.svg"/>


> Consult a doctor is a medical web application targets patients and doctors to benefit each of them. You can consider the application as your always-ready doctor.
>
> There are several specializations available in the app. Patients or doctors are able to create video chat rooms with doctors and discuss their medical issue.

### User Stories
- As a patient, I want to search doctors and access thier profiles.
- As a patient, I want to schedule a meeting with any doctor.
- As a patient, I want to inquire my medical issue with specialized doctor.

<br>

- As a doctor, I want to benefit materially from the meetings.
- As a doctor, I want to add blogs on my profile concerning my medical speciality
- As a doctor, I want to update my profile information.
- As a doctor, I want to set a profile picture and profile background image.

<br>

- As an admin, I want to add new specializations to the app.
- As an admin, I want to delete specializations from the app.
- As an admin, I want to accept and deny doctor account requests.

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that the app styling is a fresh CSS modules without using any library or preprocessor.

| Landing  | Profile  |
| -----------------| -----|
| ![Landing](./readme/wireframes/figma-landing_page.png) | ![Profile](./readme/wireframes/figma-profile.png) |

| Specializations  | Doctor sign-up  |
| -----------------| -----|
| ![Landing](./readme/wireframes/figma-specializations.png) | ![Profile](./readme/wireframes/figma%20-%20doctor_sign_up.png) |

<!-- | Artists results  | Artist's Albums  |
| -----------------| -----|
| ![Artists results](https://github.com/julescript/spotifyndr/blob/master/demo/Artists_Page.jpg) | ![Artist's Albums](https://github.com/julescript/spotifyndr/blob/master/demo/Albums_Page.jpg) | -->


<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the Well app uses:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.



<br><br>
<img src="./readme/title5.svg"/>

> Using the mentioned tech stack and the wireframes build with figma from the user stories we have, the implementation of the app is shown as below, these are screenshots and gifs from the real app.

| Landing  | Profile  |
| -----------------| -----|
| ![Landing](./readme/wireframes/app-landing_page.png) | ![Profile](./readme/wireframes/app-profile.png) |

| sign-in | Doctor sign-up  |
| -----------------| -----|
| ![Landing](./readme/wireframes/app%20-%20sign_in.png) | ![Profile](./readme/wireframes/app%20-%20doctor_sign_up.png) |

| Appointments  |  Specializations |
| -----------------| -----|
| ![Landing](./readme/wireframes/app%20-%20appointments.png) | ![Profile](./readme/wireframes/app%20-%20specializations.png) |


<br><br>
<img src="./readme/title6.svg"/>


> This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/abedulaziz/Consult-a-doctor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Navigate to the backend folder
   ```sh
   cd consult-a-doctor_backend
   ```
4. Run laravel server
   ```sh
   php artisan serve
   ```
5. Navigate to the frontend folder
   ```sh
   cd ..
   cd consult-a-doctor_frontend
   ```
6. Run Node.js server for the frontend
   ```sh
   cd npm start
   ```
6. Navigate to the WebRTC folder
   ```sh
   cd ..
   cd WebRTC_backend
   ```
6. Run Node.js server for WebRTC feature
   ```sh
   cd npm run serve
   ```


