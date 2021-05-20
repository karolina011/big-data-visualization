import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    fieldContainer: {
        padding: '2vw',
        textAlign: 'left'
    },
    label: {
        fontSize: '1.175rem',
        fontWeight: 500,
        marginBottom: '1vw'
    },
    field: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '10px',
        width: '100%',
    },
    checkboxInput: {
        width: '100%'
    },
    aggregatedOptionsTitle: {
        fontSize: '0.975rem',
        fontWeight: 500,
        color: '#7a7a7a',
        marginTop: '1vw'
    },
    chartContainer: {
        boxShadow: '0px -1px 16px 0px rgba(50, 50, 50, 0.42)',
    },
    chartTitle: {
        fontWeight: 500,
        fontSize: '1.775rem',
        color: '#616161',
        margin: '1vw 0'
    }
}));

export default useStyles;