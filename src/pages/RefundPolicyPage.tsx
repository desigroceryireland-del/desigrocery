import { Layout } from '@/components/layout/Layout';

export default function RefundPolicyPage() {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Satisfaction Guarantee</h2>
            <p className="text-muted-foreground">
              At Desi Grocery Ireland, we are committed to providing fresh, high-quality products. If you are not satisfied with your purchase, we offer refunds and replacements in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Eligibility for Refunds</h2>
            <p className="text-muted-foreground">
              Refunds are available for: damaged or defective products, incorrect items received, products past their expiry date at time of delivery, and orders that were not delivered. Requests must be made within 24 hours of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Non-Refundable Items</h2>
            <p className="text-muted-foreground">
              The following items are non-refundable: perishable goods that have been opened or consumed, items damaged due to customer mishandling, products returned after 24 hours without prior approval, and custom or special order items.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. How to Request a Refund</h2>
            <p className="text-muted-foreground">
              To request a refund, contact us at desigroceryireland@gmail.com or call 086 010 3103 within 24 hours of receiving your order. Please provide your order number, photos of the issue (if applicable), and a description of the problem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Refund Process</h2>
            <p className="text-muted-foreground">
              Once your refund request is approved, we will process the refund to your original payment method within 5-7 business days. You will receive an email confirmation when the refund is processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Replacements</h2>
            <p className="text-muted-foreground">
              In some cases, we may offer a replacement instead of a refund. Replacements will be delivered at no additional cost. If a replacement is not available, a full refund will be issued.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p className="text-muted-foreground">
              For any questions regarding refunds, please contact:<br />
              Email: desigroceryireland@gmail.com<br />
              Phone: 086 010 3103<br />
              Hours: 9 AM – 7 PM (Every Day)
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
