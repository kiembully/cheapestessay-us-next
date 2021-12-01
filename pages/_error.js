import Page404 from './404';

function Error({ statusCode }) {
    console.log("not found" + statusCode)
  return (<Page404 />);
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;