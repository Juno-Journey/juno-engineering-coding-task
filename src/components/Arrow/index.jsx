import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Arrow(props) {
    const { direction, onClick } = props;
    const icon = direction === 'left' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />;

    return <div onClick={onClick}>{icon}</div>;
}