# Contentry
Expose WordPress through GraphQL

# To Do
- add Comment data type
- add Link data type
- add Attachment data type
- add Nav data types
- add relationships for comments
- add the Meta data types (commentmeta, postmeta, termmeta)
- write some documentation
- push to npm
- add some tests
- add DataLoader to avoid repeat hits to the same resource
- caching of the sequelize queries
- unit tests

# Future Roadmap
- Authentication / authorization for accessing privileged content (unpublished posts, private settings, etc)
- Build interface to allow easy integration of plugins
- Support for WordPress plugins
- Webhooks for invalidating cache / updating websocket connections
- Mutations