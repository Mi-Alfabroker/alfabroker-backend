import { getUsers } from './src/open-api/get-users';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Alfabroker Api Document',
    description: 'Api for agents of alfabroker',
    termsOfService: '',
  },
  tags: [
    {
      name: 'Users',
    },
    {
      name: 'Authentication',
    }
  ],
  paths: {
    '/auth/users': {
      get: getUsers,
    },
    '/auth/signup': {
      post: {
        tags: ['Authentication'],
        summary: 'Create a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'email', 'password', 'status', 'type'],
                properties: {
                  username: {
                    type: 'string',
                    example: 'johndoe'
                  },
                  email: {
                    type: 'string',
                    example: 'john@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'password123'
                  },
                  status: {
                    type: 'string',
                    enum: ['active', 'inactive'],
                    example: 'active'
                  },
                  type: {
                    type: 'string',
                    enum: ['admin', 'agent'],
                    example: 'agent'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User successfully created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        status: { type: 'string' },
                        type: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad Request'
          },
          409: {
            description: 'Email already exists'
          }
        }
      }
    },
    '/auth/signin': {
      post: {
        tags: ['Authentication'],
        summary: 'Login with user credentials',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    example: 'john@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'password123'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        status: { type: 'string' },
                        type: { type: 'string' }
                      }
                    },
                    token: {
                      type: 'string',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad Request'
          },
          401: {
            description: 'Invalid credentials'
          }
        }
      }
    }
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
      description: 'Local server',
    },
    {
      url: 'https://your_production_url/api/v1',
      description: 'Production Env',
    },
  ],
};
