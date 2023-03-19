import Spinner from 'react-spinkit';

const Loader = (loading:any) => {
    return loading ? (
        <div className='overlay-content'>
            <div className='wrapper'>
                <Spinner name="line-scale" color="steelblue" style={{position: 'relative', left: '50%', top: '50%',}}/>
            </div>
        </div>
    ) : null
};

export default Loader;