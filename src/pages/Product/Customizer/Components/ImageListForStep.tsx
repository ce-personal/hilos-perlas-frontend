import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImageListForStep(props) {

    return (
        <Box>
            <ImageList variant="masonry" cols={3} gap={8}>
                {(props.listPart || []).map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={`${item.fileMain.stringFile}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.fileMain.stringFile}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.name}
                            loading="lazy"
                            style={{ borderRadius: '5px' }}
                            onClick={() => props.onChangeImage[props.index](item.fileSecondary.stringFile)}
                        />5
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
