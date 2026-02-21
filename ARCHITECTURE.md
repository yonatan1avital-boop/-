# LaVision Production Architecture

## Folder Structure

```txt
.
├── apps
│   ├── server
│   │   ├── src
│   │   │   ├── app.ts
│   │   │   ├── index.ts
│   │   │   ├── config
│   │   │   │   ├── db.ts
│   │   │   │   └── env.ts
│   │   │   ├── controllers
│   │   │   ├── middleware
│   │   │   ├── models
│   │   │   ├── routes
│   │   │   ├── services
│   │   │   ├── utils
│   │   │   └── validators
│   │   └── .env.example
│   └── web
│       ├── app
│       ├── components
│       ├── lib
│       ├── stores
│       ├── types
│       └── .env.example
├── packages
│   └── shared
│       └── src
├── ARCHITECTURE.md
└── package.json
```

## API Route Structure

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/admin/subscription`
- `GET /api/v1/users/admin/metrics`
- `GET /api/v1/blueprint`
- `PUT /api/v1/blueprint`
- `POST /api/v1/scene/generate`
- `GET /api/v1/scene`
- `POST /api/v1/eve/chat`
- `POST /api/v1/missions/init`
- `POST /api/v1/missions/complete`
- `GET /api/v1/missions/progress`
- `POST /api/v1/payments/checkout`
- `POST /api/v1/payments/webhook`
- `POST /api/v1/notifications`

## Dream Car Module Defaults

- Ferrari SF90
- Ferrari 812
- Lamborghini Revuelto
- Porsche 911
- BMW M4 Competition

## Text-to-3D Provider Hooks

- `services/scene/scene.service.ts` currently emits native Three config.
- Add provider adapters for:
  - Spline scene embed payloads
  - Luma AI generation requests
