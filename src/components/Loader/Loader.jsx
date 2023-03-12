import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      height="80"
      width="80"
      color="#3f51b5"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: '45%',
        transform: '(-50%, -50%)',
      }}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
