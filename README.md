# Contentry
Expose WordPress through GraphQL

# To Do
- write some documentation
- whitelist the meta keys and values
- push to npm
- add lots more tests
- add DataLoader to avoid repeat hits to the same resource
- caching of the sequelize queries
- unit tests

# Future Roadmap
- Authentication / authorization for accessing privileged content (unpublished posts, private settings, etc)
- Build interface to allow easy integration of plugins
- Support for WordPress plugins
- Webhooks for invalidating cache / updating websocket connections
- Mutations