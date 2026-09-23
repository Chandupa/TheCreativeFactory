export interface Client {
  id: number;
  name: string;
  alt: string;
  /**
   * Path under /public (e.g. "/logos/acme.svg"). Leave undefined until a real
   * logo asset exists — the carousel then renders a text placeholder.
   */
  logo?: string;
}
