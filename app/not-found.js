import { sans } from "./_home/font";
import Shell from "./_home/Shell";
import NotFound from "./_services/NotFound";

export const metadata = {
  title: { absolute: "Page not found | Digitl" },
  robots: { index: false },
};

export default function NotFoundPage() {
  return (
    <Shell fonts={sans.variable}>
      <NotFound />
    </Shell>
  );
}
