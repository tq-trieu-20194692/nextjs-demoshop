import {useEffect, useState} from "react";
import {Image} from "antd";
import NoImage from "../../assets/images/no_image.png";
import {ImagePreviewType} from "rc-image/lib/Image";

export const CustomImage = (
    props: {
        lazy?: boolean
        src?: string
        alt?: string
        preview?: boolean
        height?: string
        placeholderByTailWind?: String
        aspectRatio?: string
        className?: string
        isCustomPreview?: boolean
        previewType?: ImagePreviewType
        onLoadEnd?: () => void
        onLoadStart?: () => void
        objectFit?: "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "contain" | "cover" | "fill" | "none" | "scale-down"
    }
) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const onImageLoaded = () => setIsLoaded(true)

    useEffect(() => {
        setIsLoaded(false)

        if (props.onLoadStart) {
            props.onLoadStart()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.src])

    return (
        <>
            <div
                className={`${props.placeholderByTailWind ?? 'overflow-hidden w-full h-full relative bg-gray-200 animate-pulse'}`}
                style={
                    !isLoaded
                        ? {display: "block"}
                        : {display: "none"}
                }
            />
            {
                !props.lazy && <Image
                    className={`${props.className} w-full h-full `}
                    onLoad={() => {
                        if (props.onLoadEnd) {
                            props.onLoadEnd()
                        }

                        onImageLoaded()
                    }}
                    src={props.src}
                    alt={props.alt}
                    preview={!(props.isCustomPreview ?? false) ? (props.preview ?? false) : props.previewType}
                    fallback={NoImage.src}
                    style={{
                        objectFit: props.objectFit ?? 'cover',
                    }}
                    wrapperClassName={`w-full h-full fix-ant-image`}
                    wrapperStyle={
                        isLoaded
                            ? {
                                display: 'block',

                                // aspectRatio: props.aspectRatio ?? "1/1"
                            }
                            :
                            {
                                display: 'none',
                                // aspectRatio: props.aspectRatio ?? "1/1"
                            }
                    }
                />
            }
        </>
    )
}
