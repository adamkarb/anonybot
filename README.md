# Anonybot

Compatible with node versions >= 6.

Self-host anonybot to integrate anonymous messaging into your slack group.

## Installation

#### Slack Permissions

In your slack group's settings, you will need to add the application via ...

Also, you will need to assign the permissions of:
* This permission
* That permission

Set the webhook url that the slash commands will send their messages to ex. `http://example.anonybot.com`

When you are done configuring the settings, add the slash command `/anonybot`, application name (might I recommend "anonybot"?), icon, color scheme, and description.

#### Starting the Server

Before turning on the server, make sure to have the correct variables inside of `process.env` by declaring them in a file called `env.js` in the root of the project.  You will need:
* `SLACK_VERIFIER`
* `SLACK_AUTH_TOKEN`
* `SLACK_URL` (base url of slack api)



## Usage

```
/anonybot [@user|#channel-name] message...
```