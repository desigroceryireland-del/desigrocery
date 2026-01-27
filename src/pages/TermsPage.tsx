import { Layout } from '@/components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the Desi Grocery Ireland website, you accept and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Products and Pricing</h2>
            <p className="text-muted-foreground">
              All prices displayed on our website are in Euros (€) and include VAT where applicable. We reserve the right to change prices without prior notice. Product images are for illustration purposes and actual products may vary slightly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Orders and Payment</h2>
            <p className="text-muted-foreground">
              Orders are subject to availability. We accept Visa, MasterCard, PayPal, and other major payment methods. Payment must be made in full at the time of order. We reserve the right to refuse any order at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Delivery</h2>
            <p className="text-muted-foreground">
              We deliver across Ireland. Delivery times are estimates and may vary based on location and product availability. We are not responsible for delays caused by circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, and images, is the property of Desi Grocery Ireland and is protected by copyright laws. Unauthorized use is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Desi Grocery Ireland shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the value of the products purchased.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms & Conditions are governed by the laws of Ireland. Any disputes shall be subject to the exclusive jurisdiction of the Irish courts.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
