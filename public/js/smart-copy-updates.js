/**
 * SMART COPY UPDATES - For Ambitious OF Creators
 * Respects their intelligence and ego while creating FOMO
 */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    updateSmartCopy();
  }

  function updateSmartCopy() {
    // Hero Section
    updateText('.herosection .heading-80', 'You\'re Leaving Money on the Table. And You Know It.');
    updateText('.herosection .sunheading-20', 'Other Girls With Your Same Followers Are Making 6 Figures. Here\'s What They Know That You Don\'t.');

    // Instagram CTA - Simple CY Slogan
    updateText('.instagram-eps .section-heading', 'Ready to Join the CY Movement?');
    updateBtn('.instagram-eps .button-primary', 'Apply Now');

    // How We Work - Card 1
    updateText('.howwework .div-block-10:nth-child(1) .heading-86', 'You\'re One System Away from Freedom');
    updateHTML('.howwework .div-block-10:nth-child(1) .pricetext',
      `You're already doing the work. You're just not getting paid what you're worth.<br><br>You post every day. Reply to DMs. Try every growth strategy. And for what? A few hundred? Maybe a thousand if you're lucky?<br><br>Meanwhile, girls with LESS followers than you are making $10k, $50k, $100k+ per month.<br><br>What's the difference? They stopped guessing. They got a system.<br><br><strong>We handle everything behind the scenes so you can focus on creating content.</strong> Every DM. Every post. Every funnel. Optimized to turn free followers into paying subscribers.<br><br>You do what you're good at. We handle the rest.`
    );

    // How We Work - Card 2
    updateText('.howwework .div-block-10:nth-child(2) .heading-86', 'They\'re Watching. Are You Ready to Be Unforgettable?');
    updateHTML('.howwework .div-block-10:nth-child(2) .pricetext',
      `Your audience is already there. You're just not monetizing them yet.<br><br>Right now, there are people scrolling who would pay you. They want to pay you. But your funnel isn't optimized. Your messaging could be sharper. Your OnlyFans link gets lost.<br><br>We don't do "engagement." We engineer results.<br><br><strong>Every platform. Every post. Every move calculated to convert.</strong><br><br>Not followers. Not "engagement." Revenue. Consistent. Predictable. Daily.`
    );

    // Power Section
    updateHTML('.powersection .heading-81', 'Why Some Girls Make Bank <span class="text-span">While Others Work Twice as Hard</span>');
    updateHTML('.powersection .heading-82',
      `<span class="text-span-5">You see girls with the same following, same content, making 10x what you make.<br><br>And you know you're just as talented. Just as driven. Just as capable.<br><br>So what's the difference?<br><br><strong>It's not about working harder. It's about having the right system.</strong></span><span></span><span class="text-span-6"><br><br>Most agencies treat you like a number. Take their cut, give you generic advice, leave you with the same problems.<br><br>We're different.<br><br>We don't just "manage accounts." We build revenue-generating machines.</span><span></span><span><br><br>In December 2023, we rebuilt our entire system from the ground up.<br><br>The result? Our creators don't have unpredictable income anymore. They have <strong>consistent, bankable growth.</strong> Every. Single. Month.<br><br>While other agencies are guessing and hoping, we're engineering results.<br><br><strong>You don't need to work harder. You need to work with people who know exactly what they're doing.</strong><br><br>And we do.</span>`
    );

    // For Creator Elite
    updateText('.creatorwrap .heading1', 'You\'re Not Like Everyone Else. Your Strategy Shouldn\'t Be Either.');
    updateHTML('.creatorwrap .text1',
      `You didn't start this to be average. So why accept average results?<br><br>We don't just grow your OnlyFans. We position you as premium.<br><br>Brand deals. Exclusive opportunities. Partnerships that most creators don't even know exist.<br><br>This is where creators become brands.<br><br><strong>Ready to be treated like one?</strong>`
    );

    // Member Access CTA
    updateText('.memberaccess .heading2.heading', 'What If Next Month, You\'re Making 10x What You Are Now?');
    updateBtn('.memberaccess .button-primary', 'I\'m Ready');

    // Results
    updateHTML('.trip-around .heading-87', 'Real Results. <span class="text-span-4">Real Creators.</span>');
    updateText('.trip-around .paragraph', 'They Had the Same Questions You Do. Then They Applied.');

    // Testimonial - removed, keeping original content

    // Before/After
    updateText('.before-after .heading-88', 'Before SirenCY. After SirenCY.');

    // Case Study 1 - Chelsea
    updateText('.subfee .freewap-trial:nth-of-type(1) .priceheading.priceheading2', '$0 to $130k/Month in Under a Year');
    updateHTML('.subfee .freewap-trial:nth-of-type(1) .divblock1:nth-of-type(1) .pricetext',
      `Chelsea started from zero. Working a regular job, creating content on the side, making almost nothing.<br><br>Zero followers when she started. No experience with OnlyFans growth. Just knew she had potential and wanted to monetize it.<br><br>Most agencies would've told her to "build your following first." Not us.<br><br>We took her from <strong>literally zero</strong> to <strong>$130k/month</strong> in less than a year.<br><br>No paid ads. No shortcuts. Just the proven system we use with every successful creator.<br><br><strong>The only difference between Chelsea and you? She took action.</strong>`
    );
    updateHTML('.subfee .freewap-trial:nth-of-type(1) .divblock1:nth-of-type(2) .pricetext',
      `"Everyone told me I was too late. The market was saturated. I'd never make serious money.<br><br>I'm glad I didn't listen.<br><br>SirenCY showed me the exact strategy. Step by step. And now I make more in a month than I used to make in a year.<br><br>If you're on the fence: this is your moment. Stop waiting."`
    );

    // Case Study 2
    updateText('.subfee .free-trial-2 .priceheading.priceheading2', '3,000 New Paying Subscribers Every Week');
    updateHTML('.subfee .free-trial-2 .divblock1:nth-of-type(1) .pricetext',
      `She was doing everything "right."<br><br>Posting daily. Engaging with her audience. Trying every tip from other creators.<br><br>And still seeing minimal results.<br><br>Here's what most people don't realize: <strong>Effort doesn't equal income. Strategy does.</strong><br><br>We rebuilt her entire approach. Optimized her content. Fixed her conversion funnel.<br><br>One week later? <strong>3,000 new paying subscribers.</strong> Not followers. Paying subscribers.<br><br>Every. Single. Week.<br><br>This isn't luck. It's methodology.`
    );
    updateHTML('.subfee .free-trial-2 .divblock1:nth-of-type(2) .pricetext',
      `"Before SirenCY, I thought maybe I just wasn't cut out for this. Maybe my content wasn't good enough.<br><br>Turns out, my content was fine. My strategy wasn't.<br><br>They fixed what I couldn't see. Now I'm making consistent income that keeps growing.<br><br>If you're working hard but not seeing results, it's not you. It's your approach."`
    );

    // Case Study 3 - Ruby
    updateText('.subfee .free-trial-3 .priceheading.priceheading2', 'A New Subscriber Every Single Minute');
    updateHTML('.subfee .free-trial-3 .divblock1:nth-of-type(1) .pricetext',
      `Ruby was ready to give up.<br><br>Her previous agency left her with broken systems and zero confidence that this would work.<br><br>She wondered if maybe success just "wasn't for her."<br><br>Then we rebuilt everything. New strategy. New systems. New approach.<br><br>Now she gets <strong>a new subscriber every 60 seconds.</strong><br><br>Not views. Not likes. <strong>Paying subscribers.</strong> Every minute of every day.<br><br>That's not going viral. That's having a system that works.`
    );
    updateHTML('.subfee .free-trial-3 .divblock1:nth-of-type(2) .pricetext',
      `"My last agency made me doubt myself. Made me think I was the problem.<br><br>SirenCY showed me I wasn't the problem. My strategy was.<br><br>Every minute I check and there's a new subscriber. It's consistent. It's predictable. And it works.<br><br>I almost gave up right before finding them. Best decision I never made."`
    );

    // Location CTA
    updateHTML('.location .pricetext.v2.v3',
      'You Could Wake Up Tomorrow to 10x Your Current Monthly Income. Or You Could Keep Doing What You\'re Doing.'
    );
    updateBtn('.location .button-primary', 'I\'m Ready');

    // Case Study CTA
    updateBtn('.casestudies .button-primary', 'Show Me How');

    // All remaining buttons
    updateAllBtns();
  }

  function updateText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function updateHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function updateBtn(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function updateAllBtns() {
    const btns = document.querySelectorAll('.button-primary');
    btns.forEach(btn => {
      const txt = btn.textContent.trim().toLowerCase();
      if (txt.includes('apply now')) {
        btn.textContent = 'I\'m Ready';
      }
    });
  }
})();
