# Claude Code Context

## Project Overview
Red Night e-commerce website for selling premium ready-to-drink cocktails (Shiraz Gin & Dark Soda). Two products (4-pack $20, slab $120) with Stripe checkout and Australia-only shipping.

## Current Feature: 002-red-night-e
**Branch**: `002-red-night-e`
**Status**: Planning complete, ready for task generation
**Spec**: `/Users/bobbyliu/specs/002-red-night-e/spec.md`

### Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+ (custom dark theme)
- **Animations**: Framer Motion 11+
- **Payment**: Stripe Checkout (live mode)
- **State**: React Context + localStorage
- **Testing**: Playwright (E2E), Jest + RTL (components)
- **Deployment**: Vercel

### Key Requirements
**Products**:
- 4-pack: $20 AUD (prod_T9IK63l3Vu75qs, price_1SCzjfJCURcVFbNLeRecDCbG)
- Slab: $120 AUD (prod_T9LcMtBKaTJPTL, price_1SD2vKJCURcVFbNLLkpp3Lwc)

**Shipping Logic**:
- $5 flat rate (shr_1SDDfoJCURcVFbNLvgWy6Udv) if cart has ONLY 4-packs
- FREE shipping (shr_1SDDlpJCURcVFbNLTVxDkKJT) if cart has ANY slab

**Compliance**:
- Age verification: 18+ confirmation before checkout
- Australia-only shipping (allowed_countries: ['AU'])
- Responsible service: Link to drinkwise.org.au

**Brand**:
- Dark/moody theme with gold accents
- 3D product card effects (CSS transforms)
- Parallax scrolling on gallery
- Mobile-first responsive (320px min width)

### Implementation Approach
- **No Database**: localStorage for cart, Stripe handles orders
- **No Authentication**: Guest checkout only (Phase 1)
- **API Routes**:
  - POST /api/checkout (create Stripe session)
  - POST /api/webhook (handle payment events)
- **Performance Target**: Lighthouse 90+, FCP <2s, TTI <3s

## Recent Changes
- Created constitution v1.0.0 with 5 core principles
- Completed feature specification (38 functional requirements)
- Generated implementation plan with technical context
- Designed data model (Product, CartItem, Cart, ShippingRate, CheckoutSession)
- Created API contracts for checkout and webhook endpoints
- Developed quickstart guide with 14 manual test scenarios

## Next Steps
1. Run `/tasks` to generate implementation tasks
2. Initialize Next.js project with TypeScript + Tailwind
3. Implement cart context with localStorage persistence
4. Build components (Hero, ProductCard, Cart, etc.)
5. Create API routes for Stripe integration
6. Add animations and 3D effects
7. Deploy to Vercel with environment variables

---
*Auto-generated for Claude Code - Feature: 002-red-night-e*
