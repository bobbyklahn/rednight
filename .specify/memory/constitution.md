<!--
SYNC IMPACT REPORT
Version Change: [No previous version] → 1.0.0
Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (5 principles)
  - Security & Compliance
  - Performance Standards
  - Governance
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - Constitution check section aligns with principles
  ✅ spec-template.md - Requirements structure supports functional requirements
  ✅ tasks-template.md - Task categorization reflects E-commerce and Testing principles
Follow-up TODOs: None
-->

# Red Night E-Commerce Website Constitution

## Core Principles

### I. E-Commerce First
Every feature must serve the primary goal of selling Red Night products online. The website is a commercial platform focused on converting visitors to customers. Features must:
- Support product discovery and purchase flow
- Enable Stripe payment processing
- Comply with Australian alcohol sales regulations
- Provide clear product information and pricing

**Rationale**: This is a commercial e-commerce site, not a general website. All development decisions must prioritize sales conversion and customer experience.

### II. Premium Brand Experience
The website must reflect Red Night's premium, nightclub aesthetic positioning. Implementation requirements:
- Dark/moody color palette with gold accents
- 3D effects and animations (CSS transforms, parallax scrolling)
- Fast-loading, optimized images (Next.js Image)
- Mobile-first responsive design
- Sophisticated typography and spacing

**Rationale**: Brand perception directly impacts conversion rates for premium products. The digital experience must match the product's market positioning.

### III. Stripe Payment Integration (NON-NEGOTIABLE)
All payment processing MUST use Stripe's production API. Implementation rules:
- Live mode keys: pk_live_* and sk_live_* (from rednight_stripe_config.md)
- Product IDs: prod_T9IK63l3Vu75qs (4-pack), prod_T9LcMtBKaTJPTL (slab)
- Dynamic shipping logic: $5 for 4-pack only, FREE for any slab order
- Australia-only shipping restriction (allowed_countries: ['AU'])
- Server-side API key protection (never expose sk_live_* to client)

**Rationale**: Payment processing is mission-critical. Configuration must exactly match Stripe dashboard setup to ensure successful transactions.

### IV. Australia Compliance & Legal
All features must comply with Australian alcohol regulations. Mandatory requirements:
- Age verification: "You must be 18 years or older" confirmation at checkout
- Responsible service messaging: Link to drinkwise.org.au
- Geographic restriction: Australia-wide shipping only
- Business entity display: The Still Co. contact information
- Privacy and terms compliance

**Rationale**: Non-compliance risks legal penalties and business shutdown. Regulatory requirements are non-negotiable.

### V. Performance & Simplicity
Start with the simplest implementation that works. Technical constraints:
- Next.js 14+ with App Router (not Pages Router)
- TypeScript for type safety
- Tailwind CSS (no custom CSS frameworks)
- Framer Motion for animations (not Three.js in MVP)
- localStorage for cart (no database in Phase 1)
- No user authentication required (guest checkout only)

**Rationale**: Faster time-to-market with proven technologies. Complex features (user accounts, 3D models) deferred to Phase 2 after validating core e-commerce flow.

## Security & Compliance

### Environment Variables
- **NEVER** commit API keys to Git
- Use `.env.local` for development (add to .gitignore)
- Configure Vercel environment variables for production
- Server-side only: STRIPE_SECRET_KEY
- Client-safe: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_SITE_URL

### Data Protection
- No customer data storage in Phase 1 (Stripe handles PII)
- Cart data in localStorage (client-side only)
- HTTPS enforced on all pages (Vercel default)
- CORS properly configured for API routes

### Audit Requirements
- All Stripe API calls must include error logging
- Test checkout flow thoroughly before production launch
- Document all environment variable changes
- Security review required before deploying payment changes

## Performance Standards

### Loading Speed
- Lighthouse score: 90+ on mobile
- First Contentful Paint: <2 seconds
- Time to Interactive: <3 seconds
- Image optimization: Next.js Image component for all product photos

### User Experience
- Mobile-first design (320px minimum width)
- Touch-friendly targets (44px minimum)
- Smooth 60fps animations (CSS transforms, not JavaScript)
- Graceful degradation if JavaScript disabled (show static content)

### SEO Requirements
- Meta tags: Title, description per rednight_content.md
- OpenGraph tags for social sharing
- Semantic HTML structure
- Alt text on all product images
- Sitemap.xml generation

## Governance

### Amendment Process
This constitution supersedes all other development practices. To amend:
1. Document proposed change with business rationale
2. Update version following semantic versioning:
   - MAJOR: Breaking changes to payment flow, compliance requirements
   - MINOR: New principles added (e.g., internationalization, user accounts)
   - PATCH: Clarifications, wording improvements
3. Update all dependent templates (plan, spec, tasks)
4. Require approval before implementation if MAJOR change

### Compliance Verification
- All pull requests must verify:
  - Stripe configuration matches rednight_stripe_config.md
  - Age verification present on checkout flow
  - No API keys in committed code
  - Shipping logic correctly implements $5/free rules
  - Australia-only restriction enforced

### Development Workflow
- **Specifications**: Use `.specify/templates/spec-template.md` for feature requirements
- **Planning**: Use `.specify/templates/plan-template.md` for technical design
- **Tasks**: Use `.specify/templates/tasks-template.md` for implementation breakdown
- **Agent Context**: Update CLAUDE.md when new technologies or patterns introduced

### Complexity Justification
Any deviation from Principle V (Simplicity) must be documented:
- What complexity is being added (e.g., third-party service, custom algorithm)
- Why simpler alternative insufficient (specific technical blocker)
- Impact on performance, security, or maintainability
- Review and approval required before proceeding

**Version**: 1.0.0 | **Ratified**: 2025-10-02 | **Last Amended**: 2025-10-02
