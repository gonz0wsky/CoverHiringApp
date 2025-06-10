Dado que es una prueba técnica, no he terminado cosas que en producción son necesarias, por ejemplo:

- Implementación de revisores de código para mantener el código limpio y seguro entre distintos desarrolladores.  
- No publicar el `.env` en el repositorio.  
- Implementación de una estrategia de CI/CD para el control de la calidad del código y su despliegue.  
- Validación y control de formularios: Hook Form, Zod, etc.  
- Muestra de errores de red para dar feedback al usuario: algún componente de error tipo *toast*, por ejemplo.  
- Creación de *tokens* para implementar el diseño reutilizando espacios, colores, etc.  
- Implementación de un cliente que gestione la autenticación y autorización de usuarios para ser usado en la implementación del repositorio.  
- Navegación entre pantallas: React Navigation, Stack Navigator, Tab Navigator, etc., para implementar una navegación más dinámica.  
- Animaciones: Reanimated, Lottie, etc., para dar mayor fluidez a la interfaz.  
- Componentes de carga más adecuados que ayuden a reducir la percepción de carga: *Loading Indicator*, *Skeleton*, etc.

---

### Para arrancar el proyecto:

```bash
npm i
npm run ios # o npm run android
```

Para ejecutar los tests:

```bash
npm run test
```

Para ejecutar los tests e2e:
```bash
npm run ios-native # o npm run android-native
npm run e2e # requiere tener instalado Maestro en el sistema!
```

Los dispositivos usados para las pruebas son:
- iPhone 16 Plus (Simulator)
- iPhone 12 Mini
- Pixel 9 Pro API 35 (Emulator)

Otros: 
- No he implementado tests con React Native Testing Library, porque me da problemas al instalarlo en el proyecto, creo que el problema es que no es compatible con esta versión de Expo.
