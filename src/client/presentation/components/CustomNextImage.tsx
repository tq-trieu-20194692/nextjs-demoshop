import {FC} from "react";
import {NextImage, NextLegacyImage} from "../../const/Exports";
import type {ImageProps} from 'next/image';
import type {ImageProps as LegacyImageProps} from 'next/legacy/image';

type _T_ImageProps = ImageProps & {}
type _T_LegacyImageProps = LegacyImageProps & {}

const CustomNextImage: FC<_T_ImageProps> = props => {
    return (
        <NextImage
            unoptimized={true}
            {...props}
        />
    )
}

const CustomNextLegacyImage: FC<_T_LegacyImageProps> = props => {
    return (
        <NextLegacyImage
            unoptimized={true}
            {...props}
        />
    )
}

export {
    CustomNextImage,
    CustomNextLegacyImage
}
