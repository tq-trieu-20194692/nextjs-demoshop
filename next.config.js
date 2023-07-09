const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')
const {ulid} = require('ulid')
const {lib} = require("crypto-js")

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PRIVATE_KEY: ulid(),
        NEXT_PRIVATE_IV: lib.WordArray.random(128 / 8).toString()
    },
    reactStrictMode: true,
    swcMinify: true,
    /** @see https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental */
    output: 'standalone',
    distDir: 'build',
    experimental: {
        images: {
            allowFutureImage: true
        }
    },
    eslint: {
        "react/display-name": "off"
    }
}

module.exports = async (phase, {defaultConfig}) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        nextConfig.reactStrictMode = false
    }

    return {...defaultConfig, ...nextConfig}
}
