import { PhoneFrame } from "@/components/PhoneFrame";
import { FlowLayout } from "@/components/FlowLayout";
import { BrandMark } from "@/components/BrandMark";

/**
 * Welcome screen. In a real demo this becomes your marketing home or the
 * persona's dashboard — the first frame of your recording.
 */
export default function HomePage() {
  return (
    <PhoneFrame>
      <FlowLayout
        enterFrom="none"
        primaryAction={{ href: "/flow/1", label: "Start the sample flow" }}
      >
        <div className="flex flex-col justify-center h-full gap-5 pb-10">
          <BrandMark size="large" />
          <h1 className="font-display text-[32px] leading-[1.08] tracking-[-0.02em] text-navy-900">
            Your product&apos;s
            <br />
            front stage.
          </h1>
          <p className="text-[15px] leading-[1.6] text-ink-700">
            This is a walking, phone-framed, animated flow: form primitives,
            URL-threaded state, a bottom-sheet confirm, and a count-up finish.
            Reskin it, reshape it, and record it.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
            Headless 360 starter kit
          </p>
        </div>
      </FlowLayout>
    </PhoneFrame>
  );
}
