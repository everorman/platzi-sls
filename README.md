Generando layer

Se necesitan instalar las dependencias que sean solo requeridas en producción, por ello primero eliminamos nuestra carpeta de node_module y ejecutamos el siguiente comando.

```
npm i --production
```

Una vez instaladas las dependencia, siguiendo la documentación de AWS sobre como crear una layer, debemos crear una carpeta llamada nodejs.

```
mkdir nodejs
```

Luego movemos nuestra carpeta node_module a la carpeta que se creó.

```
mv node_modules/ nodejs/
```

Comprimimos nuestra carpeta nodejs

```
zip -r nodejs-layer.zip nodejs/
```

Eliminamos la carpeta nodejs

```
rm -rf nodejs/
```

Generar layer con aws client

```
aws lambda publish-layer-version --layer-name my-first-layer
--description "My first layer for lambda with nodejs"
--license-info "MIT"
--zip-file fileb://nodejs-layer.zip
--compatible-runtimes nodejs18.x
--compatible-architectures x86_64 \
```

Plugins instalados:

- [LIFT](https://www.serverless.com/plugins/lift)
- [SLS proxy](https://www.serverless.com/plugins/serverless-apigateway-service-proxy#customizing-request-parameters)
