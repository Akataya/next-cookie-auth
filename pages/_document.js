import Document, { Head, Main, NextScript } from "next/document";
import { getServerSideToken, getUserScript } from "../lib/auth";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);

    let userData;
    if (ctx.req) {
      userData = await getServerSideToken(ctx.req);
    }

    return { ...props, ...userData };
  }

  render() {
    const { user = {} } = this.props;

    return (
      <html>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
