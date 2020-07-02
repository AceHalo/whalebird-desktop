import { Entity } from 'megalodon'
import Local, { LocalState, MUTATION_TYPES } from '@/store/TimelineSpace/Contents/Local'

const account: Entity.Account = {
  id: '1',
  username: 'h3poteto',
  acct: 'h3poteto@pleroma.io',
  display_name: 'h3poteto',
  locked: false,
  created_at: '2019-03-26T21:30:32',
  followers_count: 10,
  following_count: 10,
  statuses_count: 100,
  note: 'engineer',
  url: 'https://pleroma.io',
  avatar: '',
  avatar_static: '',
  header: '',
  header_static: '',
  emojis: [],
  moved: null,
  fields: null,
  bot: false
}
const status1: Entity.Status = {
  id: '1',
  uri: 'http://example.com',
  url: 'http://example.com',
  account: account,
  in_reply_to_id: null,
  in_reply_to_account_id: null,
  reblog: null,
  content: 'hoge',
  created_at: '2019-03-26T21:40:32',
  emojis: [],
  replies_count: 0,
  reblogs_count: 0,
  favourites_count: 0,
  reblogged: null,
  favourited: null,
  muted: null,
  sensitive: false,
  spoiler_text: '',
  visibility: 'public',
  media_attachments: [],
  mentions: [],
  tags: [],
  card: null,
  poll: null,
  application: {
    name: 'Web'
  } as Entity.Application,
  language: null,
  pinned: null,
  emoji_reactions: [],
  quote: false
}
const status2: Entity.Status = {
  id: '2',
  uri: 'http://example.com',
  url: 'http://example.com',
  account: account,
  in_reply_to_id: null,
  in_reply_to_account_id: null,
  reblog: null,
  content: 'fuga',
  created_at: '2019-03-26T21:40:32',
  emojis: [],
  replies_count: 0,
  reblogs_count: 0,
  favourites_count: 0,
  reblogged: null,
  favourited: null,
  muted: null,
  sensitive: false,
  spoiler_text: '',
  visibility: 'public',
  media_attachments: [],
  mentions: [],
  tags: [],
  card: null,
  poll: null,
  application: {
    name: 'Web'
  } as Entity.Application,
  language: null,
  pinned: null,
  emoji_reactions: [],
  quote: false
}

const rebloggedStatus: Entity.Status = {
  id: '3',
  uri: 'http://example.com',
  url: 'http://example.com',
  account: account,
  in_reply_to_id: null,
  in_reply_to_account_id: null,
  reblog: status1,
  content: 'hoge',
  created_at: '2019-03-31T21:40:32',
  emojis: [],
  replies_count: 0,
  reblogs_count: 0,
  favourites_count: 0,
  reblogged: null,
  favourited: null,
  muted: null,
  sensitive: false,
  spoiler_text: '',
  visibility: 'public',
  media_attachments: [],
  mentions: [],
  tags: [],
  card: null,
  poll: null,
  application: {
    name: 'Web'
  } as Entity.Application,
  language: null,
  pinned: null,
  emoji_reactions: [],
  quote: false
}

describe('TimelineSpace/Contents/Local', () => {
  describe('mutations', () => {
    let state: LocalState

    describe('deleteToot', () => {
      describe('message is not reblogged', () => {
        beforeEach(() => {
          state = {
            lazyLoading: false,
            heading: true,
            timeline: [status2, status1],
            unreadTimeline: [],
            filter: ''
          }
        })
        it('should be deleted', () => {
          Local.mutations![MUTATION_TYPES.DELETE_TOOT](state, status1.id)
          expect(state.timeline).toEqual([status2])
        })
      })

      describe('message is reblogged', () => {
        beforeEach(() => {
          state = {
            lazyLoading: false,
            heading: true,
            timeline: [status2, rebloggedStatus],
            unreadTimeline: [],
            filter: ''
          }
        })
        it('should be deleted', () => {
          Local.mutations![MUTATION_TYPES.DELETE_TOOT](state, status1.id)
          expect(state.timeline).toEqual([status2])
        })
      })
    })
    describe('appendTimeline', () => {
      describe('heading', () => {
        describe('normal', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: true,
              timeline: [status2, status1],
              unreadTimeline: [],
              filter: ''
            }
          })
          it('should be updated timeline', () => {
            Local.mutations![MUTATION_TYPES.APPEND_TIMELINE](state, rebloggedStatus)
            expect(state.timeline).toEqual([rebloggedStatus, status2, status1])
            expect(state.unreadTimeline).toEqual([])
          })
        })

        describe('duplicated status', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: true,
              timeline: [rebloggedStatus, status2, status1],
              unreadTimeline: [],
              filter: ''
            }
          })
          it('should not be updated timeline', () => {
            Local.mutations![MUTATION_TYPES.APPEND_TIMELINE](state, rebloggedStatus)
            expect(state.timeline).toEqual([rebloggedStatus, status2, status1])
            expect(state.unreadTimeline).toEqual([])
          })
        })
      })

      describe('not heading', () => {
        describe('normal', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: false,
              timeline: [status2, status1],
              unreadTimeline: [],
              filter: ''
            }
          })
          it('should be updated timeline', () => {
            Local.mutations![MUTATION_TYPES.APPEND_TIMELINE](state, rebloggedStatus)
            expect(state.timeline).toEqual([status2, status1])
            expect(state.unreadTimeline).toEqual([rebloggedStatus])
          })
        })

        describe('duplicated status', () => {
          beforeEach(() => {
            state = {
              lazyLoading: false,
              heading: false,
              timeline: [rebloggedStatus, status2, status1],
              unreadTimeline: [],
              filter: ''
            }
          })
          it('should not be updated timeline', () => {
            Local.mutations![MUTATION_TYPES.APPEND_TIMELINE](state, rebloggedStatus)
            expect(state.timeline).toEqual([rebloggedStatus, status2, status1])
            expect(state.unreadTimeline).toEqual([])
          })
        })
      })
    })
  })
})
