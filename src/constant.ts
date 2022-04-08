const LIT4_SIZE = 0.76; // 2 ~ 4
const SIZE_5 = 0.81; // 5
const LIT8_SIZE = 0.61; // 6 ~ 7
const SIZE_8 = 0.67; // 8

export const VIDEO_SIZE_LIT4 = {
    SIZE: LIT4_SIZE,
    LIT_SIZE: 1 - LIT4_SIZE
}

export const VIDEO_SIZE_5 = {
    SIZE: SIZE_5,
    LIT_SIZE: 1 - SIZE_5
}
export const VIDEO_SIZE_LIT8 = {
    SIZE: LIT8_SIZE,
    LIT_SIZE: (1 - LIT8_SIZE) / 2
}
export const VIDEO_SIZE_8 = {
    SIZE: SIZE_8,
    LIT_SIZE: (1 - SIZE_8) / 2
}

export const VIDEO_WIDTH_MAP = 30;

export const VIDEO_SCALE = 16 / 9;

