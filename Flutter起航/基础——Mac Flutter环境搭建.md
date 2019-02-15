
# Mac安装
* [设置环境变量](https://flutter.io/community/china#configuring-flutter-to-use-a-mirror-site)
```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

* git clone
```
cd Library
git clone -b dev https://github.com/flutter/flutter.git
```

* 添加flutter工具到path
```
export PATH="$PWD/flutter/bin:$PATH"
```

* 查看是否需要安装其他依赖
```
flutter doctor
```

*  编辑环境变量
```
open -e .bash_profile
```
添加
```
export ANDROID_HOME=/Users/staven/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH=/Users/staven/Library/flutter/bin:$PATH
```

* 使配置生效
```
source  .bash_profile
```

* 升级
```
flutter upgrade
```

* 安装用于部署程序到ios的工具
```
brew update
brew install --HEAD usbmuxd
brew link usbmuxd
brew install --HEAD libimobiledevice
brew install ideviceinstaller ios-deploy cocoapods
pod setup
```