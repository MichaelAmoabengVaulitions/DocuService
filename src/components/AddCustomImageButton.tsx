import React, { FC, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';

import TemplateBox from './TemplateBox';
import AddButtonSvg from '../../assets/svgs/AddButtonSvg';
import TemplateIcon from './TemplateIcon';
import { WHITE } from '../theme/Colors';

type AddCustomImageButtonProp = {
    image?: string,
    onPress?: () => void,
    index: number,
    handleClearImage: (index: number) => void,
    style: object,
}

const AddCustomImageButton: FC<AddCustomImageButtonProp> = ({
    image, onPress, index = 0, handleClearImage, style,
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <TemplateBox onPress={onPress} style={style}>

            {image ? (
                <TemplateBox>
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                    />
                    {loading && (
                        <ActivityIndicator size="small" color={WHITE} />
                    )}
                    <TemplateBox
                        onPress={() => {
                            handleClearImage(index);
                        }}
                        style={styles.trash}
                    >
                        <TemplateIcon
                            name="trash-outline"
                            color={WHITE}
                            size={24}
                        />
                    </TemplateBox>
                </TemplateBox>
            ) : (
                <AddButtonSvg />
            )}
        </TemplateBox>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 103,
        height: 103,
        borderRadius: 20,
    },
    trash: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

export default AddCustomImageButton;
