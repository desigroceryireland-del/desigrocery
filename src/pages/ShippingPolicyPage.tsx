import { Layout } from '@/components/layout/Layout';

export default function ShippingPolicyPage() {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Delivery Areas</h2>
            <p className="text-muted-foreground">
              We currently deliver across Ireland, including Dublin, Cork, Galway, Limerick, Waterford, and all surrounding areas. For remote locations, delivery times may be extended.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Delivery Times</h2>
            <p className="text-muted-foreground">
              Standard delivery: 2-3 business days. Express delivery (Dublin area): Next day delivery for orders placed before 2 PM. Same-day delivery available in select Dublin areas for orders placed before 11 AM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Shipping Costs</h2>
            <p className="text-muted-foreground">
              Free delivery on orders over €50. Standard delivery: €4.99 for orders under €50. Express delivery: €7.99. Same-day delivery: €9.99. Delivery charges will be displayed at checkout before payment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Order Processing</h2>
            <p className="text-muted-foreground">
              Orders are processed Monday to Saturday, 9 AM to 5 PM. Orders placed on Sundays or public holidays will be processed the next business day. You will receive an email confirmation once your order is dispatched.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Store Collection</h2>
            <p className="text-muted-foreground">
              Free store collection is available at our Dublin location. Orders are typically ready for collection within 2 hours of order confirmation. You will receive an SMS when your order is ready.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Tracking Your Order</h2>
            <p className="text-muted-foreground">
              Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order status through your account or by contacting our customer service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Delivery Issues</h2>
            <p className="text-muted-foreground">
              If you experience any issues with your delivery, please contact us immediately at desigroceryireland@gmail.com or 086 010 3103. We will investigate and resolve the issue as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Perishable Items</h2>
            <p className="text-muted-foreground">
              Perishable items are carefully packed with ice packs to maintain freshness during transit. Please ensure someone is available to receive the delivery and refrigerate items promptly upon arrival.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
