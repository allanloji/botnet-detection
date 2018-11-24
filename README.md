# Herramienta Detección de Botnets
La herramienta busca ayudar a disminuir la cantidad de computadoras infectadas por botnets a través del análisis de los paquetes de red entrantes y salientes desde el dispositivo y buscando algunos comportamientos comunes entre los botnets más conocidos. La identificación se hace a traves de distintos parámetros en cierto periodo de tiempo como lo son número de conexiones fallidas, aumento de tráfico, aumento de tráfico en puertos específicos y conexiones a IPs registradas como servidores de C&C de Botnets de acuerdo a páginas como [IBM X-Force Exchange](https://exchange.xforce.ibmcloud.com/collection/Botnet-Command-and-Control-Servers-7ac6c4578facafa0de50b72e7bf8f8c4).

<p align="center">
    <img src="https://i.imgur.com/zvDqx0j.jpg" width="400px" height="250px"/>
    <img src="https://i.imgur.com/xMyeice.jpg" width="400px" height="250px"/>
</p>

<p align="center">
    <image src="https://media.giphy.com/media/46htQzEoK3eJYOUW8A/giphy.gif"/>
</p>



## Motivación
En años recientes, el riesgo de las botnets ha incrementado ya que los botmasters pueden llegar a control desde cientos, hasta miles de millones de computadoras. Esto representa un riesgo mayúsculo para la infraestructura económica, informática y de comunicación.

## ¿Cómo funciona?
Se hace un escaneo de la red de forma constante cada cierto periodo de tiempo previamente configurado, se realiza un análisis de la información de la red. Estos datos son guardados en un dataframe de pandas para su procesamiento, se llaman los métodos del analizador el cual identifica a posibles amenazas de botnets de acuerdo a cuatro parámetros: número de conexiones fallidas, aumento de tráfico, aumento de conexiones en ciertos puertos, y conexiones a IPs maliciosas. Una vez identificadas las posibles amenazas, se hace obtención de información de las IPs a través de la conexión con IP-API, esta información es enviada a una base de datos en Firebase y desplegada para su visualización en la aplicación web.

## Tecnología utilizada 
* Python (3.6)
* Pandas
* Pyrebase
* React
* Firebase
* [IP-API](http://ip-api.com/)

## Instalación
### Analizador de red
Instalar las siguientes librerías de pyhton, se recomienda usar Python 3.6
```
    $ pip install pandas
    $ pip install pyrebase

```
### Aplicación web
Dirigirse a la carpeta de la aplicación web e instalar los paquetes con el comando:
```
    $ npm install
```

## Configuración
* Ingresar credenciales de firebase en variable config del archivo pypacket.py y analizer.py
```
    config = {
        "apiKey": "",
        "authDomain": "",
        "databaseURL": "",
        "storageBucket": "",
    }
```
* Ingresar credenciales de firebase en variable config del archivo botnet-app-web/src/components/Fire/Fire.js
* Si se desean agregar IPs a la base de datos, modificar archivo ip_database.csv
* Cualquier cambio en los parámetros para el análisis se deberán hacer en el archivo analize.py

## Uso
Dirigirse a la carpeta del analizador y ejecutar el comando
```
    $ sudo python pypacket.py
```

Para la aplicación web dirigirse a la cerpeta de botnet-app-web y ejecutar el comando
```
    $ cd botnet-app-web
    $ npm start
```

Para poder ver la aplicación en ejecución, abrir navegador e ingresar la dirección http://localhost:3000


## Contribuidores
* [allanloji](https://github.com/allanloji)
* [montaal](https://github.com/montaal)
* [BetanCesar](https://github.com/BetanCesar)






