# EDUSYNC: A Mobile Time Management Application to Streamline Students Task


## Description

Edusync is a mobile application that helps students to manage their time effectively. It allows students to create a timetable, set reminders for assignments and exams, and track their progress. The app also provides access to educational resources, such as study materials and tutorials, to help students improve their academic performance. By providing a centralized platform for time management and academic support, Edusync aims to help students achieve their academic goals and succeed in their studies.
## Installation

### Dependencies and Libraries

* [Node.js](https://nodejs.org/en/download/package-manager/current)
* [React Native](https://reactnative.dev/)

## Installation steps

1. **Clone the repository:**
    clone the repository by running the following command in the terminal
    ```bash
    git clone https://github.com/JerryLegend254/edu-sync.git
    ```
    Then in the terminal change the directory
   ```bash
   cd edu-sync
   ````

3. **Install dependencies:**

    ```bash
    bunx expo install
    bun install
    ```

## Usage Instructions

### How to Run the application

* For the android(Emulator or mobile phone):

    ```bash
    bun run android
    ```
* For the ios(Xcode or mobile phone):

    ```bash
    bun run ios
    ```


## Project Structure

```
├── app
│   ├── (auth)
│   │   ├── forgotpassword.tsx
│   │   ├── _layout.tsx
│   │   ├── resetpassword.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (home)
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   ├── (settings)
│   │   │   ├── change-password
│   │   │   │   └── index.tsx
│   │   │   ├── index.tsx
│   │   │   ├── _layout.tsx
│   │   │   ├── my-categories
│   │   │   │   └── index.tsx
│   │   │   ├── notification
│   │   │   │   └── index.tsx
│   │   │   └── profile
│   │   │       └── index.tsx
│   │   ├── (study_materials)
│   │   │   ├── add.tsx
│   │   │   ├── index.tsx
│   │   │   └── _layout.tsx
│   │   └── (tasks)
│   │       ├── add.tsx
│   │       ├── [id]
│   │       │   └── edit.tsx
│   │       ├── [id].tsx
│   │       ├── index.tsx
│   │       └── _layout.tsx
│   ├── index.tsx
│   └── _layout.tsx
├── app.json
├── babel.config.js
├── bun.lockb
├── components
│   ├── bar-container
│   │   └── bar-container.tsx
│   ├── button
│   │   └── button.tsx
│   ├── CustomDrawerComponent.tsx
│   ├── iconContainer
│   │   └── icon-container.tsx
│   ├── profile
│   │   └── profile-settings-card.tsx
│   ├── safearea
│   │   └── safearea.tsx
│   ├── sectionBar
│   │   └── section-bar.tsx
│   └── spacer
│       └── spacer.tsx
├── constants
│   ├── colors.ts
│   └── fonts.ts
├── expo-env.d.ts
├── hooks
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
├── lib
│   ├── apiCategories.ts
│   ├── api-functions.ts
│   ├── apiStudyMaterial.ts
│   ├── apiTasks.ts
│   ├── supabase.ts
│   └── utils-functions.ts
├── package.json
├── package-lock.json
├── providers
│   ├── AuthProvider.tsx
│   ├── MyTaskProvider.tsx
│   └── ProtectedRoutes.tsx
├── README.md
├── scripts
│   └── reset-project.js
├── tsconfig.json
└── type-declarations
    └── index.ts
```


## Acknowledgent

* [React Native Paper](https://reactnativepaper.com/)
* [React Expo Documentation](https://docs.expo.dev/)
* [React Native Documentation](https://reactnative.dev/docs/getting-started)
* [Tanstack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
* [Supabase Documentation](https://supabase.com/docs)

