# Deploying Sacred Knowledge to AWS EC2

A single EC2 host running Docker Compose: **nginx** (reverse proxy + TLS) →
**frontend** (Next.js) + **backend** (Express). The database is **MongoDB Atlas**
(managed, external to the host).

## 1. Provision the instance

- **AMI**: Ubuntu 22.04 LTS
- **Type**: `t3.small` (min) / `t3.medium` (recommended)
- **Storage**: 20 GB gp3
- **Security group inbound**: `22` (SSH, your IP), `80` (HTTP), `443` (HTTPS)
- Allocate an **Elastic IP** and point your domain's `A` record at it.

## 2. MongoDB Atlas

1. Create a cluster (free M0 is fine to start).
2. **Network Access** → add your EC2 Elastic IP (or `0.0.0.0/0` for testing only).
3. **Database Access** → create a user.
4. Copy the SRV connection string into `backend/.env` as `MONGODB_URI`.

## 3. Install Docker on the host

```bash
sudo apt-get update && sudo apt-get install -y docker.io docker-compose-plugin git
sudo usermod -aG docker $USER && newgrp docker
```

## 4. Clone and configure

```bash
git clone <your-repo-url> sacredchain && cd sacredchain

cp backend/.env.example backend/.env
# Edit backend/.env: set MONGODB_URI, JWT_SECRET, REFRESH_SECRET,
# CLIENT_ORIGIN=https://your-domain.com, and (optional) STRIPE_*, SMTP_*, AWS_*, ANTHROPIC_API_KEY

# Tell the frontend build where the API lives (through nginx):
export NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

Edit `deploy/nginx.conf` and replace `your-domain.com` with your domain.

## 5. First boot (HTTP) + seed

```bash
docker compose up -d --build
# seed the catalog + demo users (one-off):
docker compose exec backend npm run seed
```

Visit `http://your-domain.com` — the app should load.

## 6. Enable HTTPS (Let's Encrypt)

```bash
sudo apt-get install -y certbot
docker compose stop nginx
sudo certbot certonly --standalone -d your-domain.com \
  --config-dir ./deploy/certbot/conf --work-dir ./deploy/certbot/work --logs-dir ./deploy/certbot/logs
# Uncomment the 443 server block (and the HTTP→HTTPS redirect) in deploy/nginx.conf
docker compose up -d nginx
```

Set up auto-renewal via cron: `0 3 * * * certbot renew --quiet && docker compose restart nginx`.

## 7. Stripe webhook

In the Stripe Dashboard add an endpoint: `https://your-domain.com/api/payments/webhook`,
subscribe to `payment_intent.succeeded`, and put the signing secret in
`backend/.env` as `STRIPE_WEBHOOK_SECRET`. Restart: `docker compose up -d backend`.

## 8. Updates

```bash
git pull
docker compose up -d --build
```

## Notes

- **Video**: defaults to the public `meet.jit.si`. For production, self-host
  Jitsi (or use a JaaS account) and set `NEXT_PUBLIC_JITSI_DOMAIN`.
- **Secrets**: prefer AWS SSM Parameter Store / Secrets Manager over a plaintext
  `.env` for production.
- **Scaling**: move nginx/TLS to an ALB + ACM cert and run the containers on ECS
  when you outgrow a single host.
