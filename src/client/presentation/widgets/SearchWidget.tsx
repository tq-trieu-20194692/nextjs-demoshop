import {FC} from "react";
import {Form, FormInstance, Input} from "antd";
import {useTranslation} from "react-i18next";
import {SearchOutlined} from "@ant-design/icons";
import {debounce} from "lodash";
import {App} from "../../const/App";

type _T_Props = {
    form: (form: FormInstance) => void
    callback: Function
    size?: "small" | "middle" | "large"
}

export const SearchWidget: FC<_T_Props> = props => {
    const {t} = useTranslation()
    const [form] = Form.useForm()

    const handleSearch = (value: string) => debounceSearch(value)
    const debounceSearch = debounce((value: string) => {
        props.callback(value)
        props.form(form)
    }, App.DelaySearch)

    return (
        <Form
            form={form}
        >
            <Form.Item name={'search'} className={'mb-0'}>
                <Input
                    size={props.size ?? "middle"}
                    allowClear
                    placeholder={`${t('text.search')}`}
                    prefix={<SearchOutlined/>}
                    onChange={e => handleSearch(e.target.value)}
                />
            </Form.Item>
        </Form>
    )
}
