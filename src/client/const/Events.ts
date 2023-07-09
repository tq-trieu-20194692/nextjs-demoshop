export enum E_SendingStatus {
    none,
    loading,
    idle,
    complete,
    success,
    failure,
    error,
    warning,
    disConnect,
    unauthorized,
    serverError,
    maintenance,
}

export enum E_ResCode {
    HTTP_OK = 200,
    HTTP_BAD_REQUEST = 400,
    HTTP_UNAUTHORIZED = 401,
    HTTP_INTERNAL_SERVER_ERROR = 500,
    HTTP_SERVICE_UNAVAILABLE = 503
}

export enum E_LSKey {
    User = 'user',
    Lang = 'lang'
}

export enum E_CookieKey {
    User = 'user'
}

export enum E_ImageResUrlType {
    Orig = "o",
    Download = "d",
    Thumb = "t"
}

export enum E_CustomerState {
    Inactive,
    Active
}

export enum E_CommonState {
    Inactive,
    Active,
    Maintenance
}

export enum E_TimelapseType {
    Test = "test",
    Timelapse4K = "dc-4k",
    Timelapse6K = "dc-6k",
    Timelapse2K = "dc-2k",
    TimelapseCCTV = "cctv",
    TimelapseCamera = "cam"
}

export enum E_TimelapseUploadType {
    Full = "f",
    Part = "p"
}

export enum E_DriveBoxState {
    inactive,
    ready
}

export enum E_DriveBoxFileState {
    joining,
    ready
}

export enum E_DriveBoxResState {
    sending,
    processing,
    complete,
    error
}
