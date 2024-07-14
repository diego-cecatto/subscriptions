import { createRoot } from 'react-dom/client';
import { BillingPage } from './pages/billing/billing'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<BillingPage />
);