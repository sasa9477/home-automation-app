import { forwardRef } from 'react';

import SwitchSettingCard, { SwitchSettingCardProps } from './SwitchSettingCard';

// Fade(Mui API)を使用するために HOC(高層コンポーネント)が必要
// https://mui.com/material-ui/transitions/#child-requirement
// https://www.gaji.jp/blog/2021/01/08/6247/
// divを介して refと propsをバケツリレーでわたす必要がある
// divにないプロパティをわたすとエラーになるので、オブジェクトでラップしてわたす
const SwitchSettingCardRef = forwardRef<HTMLDivElement, SwitchSettingCardProps>(
  (props, ref) => {
    return (
      <div ref={ref} {...props}>
        <SwitchSettingCard {...props} />
      </div>
    )
  })

export default SwitchSettingCardRef
