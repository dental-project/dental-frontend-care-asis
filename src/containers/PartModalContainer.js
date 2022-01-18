import React from 'react'
import Modal from 'components/Modal/Modal'

const PartModalContainer = ({ modalType, open, close }) => {
    return (
        <Modal open={open}>
            <form onSubmit={handleSubmit(onSubmit)}>
                { 
                modalType === "삭제"
                ? null
                : (
                    <>
                    <Controller
                        name="partName"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            className={classes.textField} 
                            label="파트명"
                            variant="outlined"
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={{ 
                        required: "파트명을 입력하세요."
                        }}
                    />
                    </>
                )
                }
                <Button
                type="submit"
                className={classes.button} 
                color="info" 
                round
                >{modalType}
                </Button> 
            </form>
            <Button
            className={classes.button} 
            color="danger" 
            round
            onClick={close}
            >취소
            </Button>
        </Modal>
    )
}

export default PartModalContainer
