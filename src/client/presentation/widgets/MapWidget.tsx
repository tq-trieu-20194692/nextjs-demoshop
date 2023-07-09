import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from '@goongmaps/goong-map-react';
import {Modal, Select} from "antd";
import axios from "axios";
import {UrlQuery} from "../../core/UrlQuery";
import {debounce} from "lodash";
import {App} from "../../const/App";
import {EnvironmentTwoTone} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Map} from "../../const/Map";
import {Color} from "../../const/Color";

export type T_AddressType = {
    name: string
    lat: number
    lng: number
}

export type T_MapProps = {
    isOpen: boolean
    coordinate?: [number | undefined, number | undefined]
    callback?: Function
    onClose?: Function
}

export const MapWidget: FC<T_MapProps> = props => {
    const {t} = useTranslation()

    const [viewport, setViewport] = useState({
        width: 800,
        height: 700,
        latitude: 21.031673076538056,
        longitude: 105.84038426747847,
        zoom: 14
    })

    const [options, setOptions] = useState([])

    const [urlQueryParams, setUrlQueryParams] = useState({
        api_key: Map.ApiKeyMap,
        input: ''
    })

    const [selected, setSelected] = useState({
        api_key: Map.ApiKeyMap,
        place_id: ''
    })

    const [address, setAddress] = useState<T_AddressType>({
        name: '',
        lat: viewport.latitude,
        lng: viewport.longitude
    })

    useEffect(() => {
        console.log('%cMount Screen: MapWidget', Color.ConsoleInfo)

        return () => {
            console.log('%cUnmount Screen: MapWidget', Color.ConsoleInfo)
        }
    }, [])

    useEffect(() => {
        if (
            props.coordinate
            && (props.coordinate[0] !== undefined && props.coordinate[0] !== 0)
            && (props.coordinate[1] !== undefined && props.coordinate[1] !== 0)
        ) {
            setViewport({
                ...viewport,
                latitude: props.coordinate[0],
                longitude: props.coordinate[1]
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.coordinate])

    useEffect(() => {
        if (!props.isOpen) {
            setViewport({
                ...viewport,
                latitude: 21.031673076538056,
                longitude: 105.84038426747847
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen])

    useEffect(() => {
        if (props.isOpen) {
            setAddress({
                name: '',
                lat: viewport.latitude,
                lng: viewport.longitude
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen])

    const onOk = () => {
        if (props.callback) {
            props.callback({
                name: address.name,
                lat: address.lat,
                lng: address.lng
            })
        }

        onCloseMap()
    }

    const onCloseMap = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    const handleSearch = debounce((value: string) => {
        if (value.length > 0) {
            setUrlQueryParams({
                ...urlQueryParams,
                input: value
            })
        } else {
            setOptions([])
        }
    }, App.DelaySearch)

    const handleSelect = (value: string) => {
        if (value !== undefined) {
            setSelected({
                ...selected,
                place_id: value
            })
        }
    }

    useEffect(() => {
        if (urlQueryParams.input !== '') {
            const urlQuery = new UrlQuery(urlQueryParams)

            axios
                .get(`https://rsapi.goong.io/Place/AutoComplete${urlQuery.toString()}`)
                .then(r => {
                    if (r.data) {
                        if (r.data.predictions) {
                            setOptions(
                                r.data.predictions.map((item: any) => {
                                    return {
                                        value: item.hasOwnProperty('place_id') ? item.place_id : '',
                                        label: item.hasOwnProperty('description') ? item.description : ''
                                    }
                                })
                            )
                        } else {
                            setOptions([])
                        }
                    }
                })
        }

    }, [urlQueryParams])

    useEffect(() => {
        if (selected.place_id !== '') {
            const urlQuery = new UrlQuery(selected)

            axios
                .get(`https://rsapi.goong.io/Place/Detail${urlQuery.toString()}`)
                .then(r => {
                    if (r.data.result.geometry.location) {
                        console.log(r)
                        setViewport({
                            ...viewport,
                            latitude: r.data.result.geometry.location.lat,
                            longitude: r.data.result.geometry.location.lng
                        })
                        setAddress({
                            name: r.data.result.formatted_address,
                            lat: r.data.result.geometry.location.lat,
                            lng: r.data.result.geometry.location.lng
                        })
                    }
                })

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    const changeCoordinate = (coordinate: number[]) => {
        setAddress({
            ...address,
            lng: coordinate[0],
            lat: coordinate[1]
        })
    }

    return (
        <Modal
            forceRender={false}
            centered
            open={props.isOpen}
            onCancel={onCloseMap}
            width={848}
            closable={false}
            className={'relative'}
            zIndex={1030}
            onOk={onOk}
        >
            <ReactMapGL
                {...viewport}
                onClick={e => changeCoordinate(e.lngLat)}
                goongApiAccessToken={Map.AccessKeyMap}
                onViewportChange={setViewport}
            >
                <Marker
                    longitude={address.lng}
                    latitude={address.lat}
                    draggable
                    onDragEnd={e => changeCoordinate(e.lngLat)}
                >
                    <EnvironmentTwoTone className={'text-lg'} twoToneColor={'#FF0000'}/>
                </Marker>
            </ReactMapGL>
            <Select
                showSearch
                allowClear
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                notFoundContent={null}
                className={'absolute top-10 left-10 w-[400px]'}
                placeholder={`${t('text.search')}`}
                onChange={handleSelect}
                onSearch={handleSearch}
                options={options}
            />
        </Modal>
    )
}
