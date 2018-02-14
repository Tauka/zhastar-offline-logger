# Zhastar Offline Logger

This package helps to handle logging in Zhastar offline projects

### Installing
`npm install --save @zhastar/zhastar-offline-logger`

### Logging style
It creates new log file name with date for each day.
Each log file has *function name*, *file name* and *line* from which log has been called, *type*, *time*, and *log message*

### Logging directories
* **MacOS**: `~/<app name>/logs`
* **Windows**: `%USERPROFILE%\<app name>\logs`

### API
* #### `logger.setSettings({ appName: string })`
    Allows you to specify folder name in which logs will be stored
    > Obligatory to call it before anything
    ```
    logger.setSettings({
        appName: "MyCoolApp"
    });

    // now logging directory for MacOS will be "~/MyCoolApp/logs"
    ```

* #### `logger.initialize()`
    Initializes logging directory
    > You must call it before `log()`

* #### `logger.log(message: string, [type: 'info' | 'warn' | 'error' | 'debug' ])`
    ```
    logger.log("This is debug message", 'debug');
    ```

### Example
```
### getStudentResults (index.js:7:12) ###
[INFO] (17:35:58:268): Succesfully fetched students!

### sendCredentials (index.js:7:12) ###
[DEBUG] (17:37:58:268): {login: 'tauka'}

### changePermissions (index.js:7:12) ###
[ERROR] (17:39:58:268): Unknown error!
```

