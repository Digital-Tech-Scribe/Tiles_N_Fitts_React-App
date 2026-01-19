import { motion } from 'framer-motion';
const stats = [{
  value: '70+',
  label: 'projects designed'
}, {
  value: '20+',
  label: 'projects designed and built'
}, {
  value: '100+',
  label: 'No of residences'
}, {
  value: '16Bi.',
  label: 'Total project value'
}, {
  value: '8yrs',
  label: 'Years of operation'
}, {
  value: '15+',
  label: 'Satisfied clients'
}];
export function StatsSection() {
  return <section className="py-24 px-6 md:px-12 bg-white border-t border-zinc-100">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }}>
              <h3 className="text-5xl md:text-6xl font-light text-zinc-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}