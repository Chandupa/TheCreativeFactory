export default function AboutBio() {
  return (
    <div
      className="bg-gradient-to-br from-blue-950/50 to-purple-950/30 rounded-2xl p-8 md:p-12 border border-blue-400/20 mb-16 backdrop-blur-xs hover:border-blue-400/40 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
      style={{ animationDelay: "200ms" }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-3">
        <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">About</span>
        <span className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
      </h2>
      <div className="text-base md:text-lg text-blue-100 leading-relaxed md:leading-7 space-y-4">
        <p>
          Chandupa Weerakkody is the Founder, CEO, and Lead Designer of The Creative Factory, a Colombo-based creative
          agency known for its innovative and impactful designs. Starting his creative journey at age 12, Chandupa
          combines artistic vision with strategic leadership to drive brand growth and originality.
        </p>
        <p className="text-blue-200 font-semibold">
          Guided by his philosophy, &quot;See the unseen, tell the untold,&quot; he continues to shape The Creative
          Factory into a leader in modern creative solutions.
        </p>
      </div>
    </div>
  );
}
