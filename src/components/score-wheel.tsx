import { usePrev } from "../lib/hooks";
import { useEffect, useMemo } from "react";
import { animated, useSpring, to } from "@react-spring/web";

const OFFSET = -0.1;
const ITEM_HEIGHT = 80;
/* keep ~80x45 aspect ratio */
const ITEM_WIDTH = ITEM_HEIGHT * 0.56;

type RotationMap = {
  [k in number]: {
    spawnPosition: number;
    position: number;
  };
};

function getParams(itemCount: number) {
  const itemAngle = 360 / itemCount;

  const alpha = itemAngle / 2;
  const a = ITEM_HEIGHT / 2;
  const c = a / Math.sin((alpha * Math.PI) / 180);
  const b = Math.sqrt(c * c - a * a);

  return {
    itemCount,
    angle: itemAngle,
    diameter: b * 2 + OFFSET,
    radius: b + OFFSET,
  };
}

function calculateRotationDelta(fromAngle: number, toAngle: number) {
  const normalizedFrom = ((fromAngle % 360) + 360) % 360;
  const normalizedTo = ((toAngle % 360) + 360) % 360;

  const clockwiseDiff = (normalizedTo - normalizedFrom + 360) % 360;
  const counterclockwiseDiff = (normalizedFrom - normalizedTo + 360) % 360;

  return clockwiseDiff < counterclockwiseDiff
    ? clockwiseDiff
    : -counterclockwiseDiff;
}

export function ScoreWheel({
  num: nextNum,
  max = 9,
}: {
  num: number;
  max?: number;
}) {
  nextNum = Math.min(Math.max(nextNum, 0), max);
  const digitCount = useMemo(() => String(max).length, [max]);
  const params = useMemo(() => getParams(max + 1), [max]);
  const rotationMap = useMemo(() => {
    const nums = Array.from({ length: params.itemCount }).map((_, i) => i);
    const _rotationMap: RotationMap = {};
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      _rotationMap[num] = {
        spawnPosition: params.angle * (nums.length - i),
        position: params.angle * i,
      };
    }
    return _rotationMap;
  }, [params]);
  const num = usePrev(nextNum) ?? 0;

  const [styles, api] = useSpring(() => ({ rotateX: 0 }), []);

  useEffect(() => {
    if (num !== nextNum) {
      const numAngle = rotationMap[num].position;
      const nextNumAngle = rotationMap[nextNum].position;
      const rotationDelta = calculateRotationDelta(numAngle, nextNumAngle);
      api.start({
        from: { rotateX: numAngle },
        to: { rotateX: numAngle + rotationDelta },
      });
    }
  }, [num, nextNum, api, rotationMap]);

  return (
    <div
      className="flex justify-center items-center box-border overflow-hidden"
      style={{
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH * digitCount,
      }}
    >
      <div>
        <animated.div
          className="relative [transform-style:preserve-3d] box-border"
          style={{
            transformOrigin: `50% calc(50% + ${ITEM_HEIGHT / 2}px)`,
            marginTop: `-${ITEM_HEIGHT}px`,
            height: ITEM_HEIGHT,
            width: ITEM_WIDTH * digitCount,
            transform: to([styles.rotateX], (x) => {
              return `rotateX(${x}deg)`;
            }),
          }}
        >
          {Object.entries(rotationMap).map(([num, rotation]) => (
            <div
              key={`${num}`}
              className="flex justify-center items-center h-[100%] w-[100%] text-[5rem] absolute top-[50%] box-border [backface-visibility:hidden]"
              style={{
                transform: `rotateX(${rotation.spawnPosition}deg) translateZ(${params.radius}px)`,
                height: ITEM_HEIGHT,
                width: ITEM_WIDTH * digitCount,
              }}
            >
              <span>{String(num).padStart(digitCount, "0")}</span>
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  );
}
