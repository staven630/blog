# 设置别名
&emsp;&emsp;在根目录下tsconfig.json中添加baseUrl and paths
```
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@app/*": ["app/*"],
      "@assets/*": ["assets/*"],
      "@env/*": ["environments/*"],
      "@views/*": ["app/views/*"],
      "@core/*": ["app/core/*"],
      "@constants": ["app/core/constants/*"],
      "@model/*": ["app/core/model/*"],
      "@interceptors/*": ["app/core/interceptors/*"],
      "@services/*": ["app/core/services/*"],
      "@validators/*": ["app/core/validators/*"],
      "@shared/*": ["app/shared/*"],
      "@components/*": ["app/shared/components/*"],
      "@directives/*": ["app/shared/directives/*"],
      "@guards/*": ["app/shared/guards/*"],
      "@pipes/*": ["app/shared/pipes/*"]
    },
}
```
# 访问环境变量
```
import { environment } from '@env/environment'
```
&emsp;&emsp;添加了@env别名，以便能够import { environment } from '@env/environment',从应用程序中的任何位置轻松访问环境变量。它适用于所有指定的环境，因为cli它会根据--env传递给ng build命令的标志自动解析正确的环境文件。
# 添加build配置
```
"hmr": "ng serve --configuration hmr --port 3000 --open",
"dev": "ng build --configuration dev --vendor-chunk",
"prod": "ng build --prod --vendor-chunk"
```