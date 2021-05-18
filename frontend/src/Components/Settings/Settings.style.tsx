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
    }
}));

export default useStyles;