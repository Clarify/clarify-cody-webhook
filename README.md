# Clarify Conversation Dynamics Webhook Server

This server receives webhooks from the Clarify Cody system and processes the results.

Clarify Cody sends a webhook for each conversation when the conversation's insights have finished processing. The conversation's `media` insight should provides the status of the recording download and media. Depending on the status of the media, one or more other insights will be available (`speech`, `transcript`, `keywords` etc.) In general, you should not assume the existence of any particular insight for any particular conversation.

## Hapi

The server is built using the [hapijs](https://hapijs.com/) framework. It uses a plugin-based architecture where the core services are standard plugins and custom plugins provide the Clarify webhook functionality.

The following are key files:

- `lib/index.js` - the main entry point, creates the server and handles graceful shutdown.

- `config.js` - configuration file containing all the settings that might need to be changed for different deployments.

- `lib/manifest.js` - defines the server connections, plugins, and configuration of them (using `config.js`.)

- `lib/clarify_cody` - a plugin to create and expose a Clarify Cody API client

- `lib/cody_webhook` - a plugin that handles webhooks

- `lib/cody_webhook/controller.js` - a class that performs the logic of handling a webhook. This class should be modified to process and send the conversation insight results to various databases etc. as required.

If you are sending data to external databases or APIs, there may be existing hapi modules that can be leveraged. If not, new plugins can be created or code added to the `cody_webhook` plugin.


## Deployment

The server has no direct dependencies other than it needs an outbound network connection to the Clarify Cody API and inbound access to it's bound HTTP port.

It is expected that for high availability, there will be multiple instances of the server running behind a load balancer and the URL of the load balancer will be used as the `notify_url` in the Clarify Cody API.

Logging is done using the Hapi `good` plugin and configured in `config.js`. When running in a Docker container, logs can be sent to stdout.


## Webhook Retries

If the webhook handler returns a non-200 level HTTP status code, the Clarify system will automatically retry the webhook after a delay, up to a limited number of retries (5). This means that if your handler encounters a temporary error such as database connection problem, it can return an HTTP status code and it will automatically be retried.


## Healthcheck

The server exposes the endpoint `http://host:port/hc` for a healthcheck. It returns the string 'OK' with a 200 HTTP status code.


## Testing

The project is using the Hapi `lab` module for unit tests. They can be run using `npm test`. Mock http responses are using the `nock` module and mocks are defined in `lib/test/mocks.js`.
