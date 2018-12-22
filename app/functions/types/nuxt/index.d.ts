declare module "nuxt" {
  export class Nuxt {
    constructor(config: any);
    render(req: any, res: any): Promise<any>;
  }
}
